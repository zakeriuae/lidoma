/**
 * سیستم مدیریت مودال
 * قابل استفاده مجدد و ساده برای تمام صفحات
 */

class ModalManager {
    constructor() {
        this.modals = new Map();
        this.init();
    }

    init() {
        // اضافه کردن event listener برای بستن با کلید ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAll();
            }
        });

        // بستن با کلیک روی overlay
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                const modalId = e.target.getAttribute('data-modal-id');
                if (modalId) {
                    this.close(modalId);
                }
            }
        });
    }

    /**
     * ایجاد یک مودال جدید
     * @param {string} id - شناسه منحصر به فرد مودال
     * @param {string} title - عنوان مودال
     * @param {string} content - محتوای HTML مودال
     * @param {Object} options - تنظیمات اضافی (footer, width, etc.)
     */
    create(id, title, content, options = {}) {
        if (this.modals.has(id)) {
            console.warn(`Modal with id "${id}" already exists`);
            return;
        }

        const {
            footer = null,
            width = '600px',
            closeOnOverlayClick = true,
            showCloseButton = true
        } = options;

        const modalHTML = `
            <div class="modal-overlay" id="modal-${id}" data-modal-id="${id}" style="display: none;">
                <div class="modal-container" style="max-width: ${width};">
                    <div class="modal-header">
                        <h2 class="modal-title">${title}</h2>
                        ${showCloseButton ? '<button class="modal-close" aria-label="بستن">&times;</button>' : ''}
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
                </div>
            </div>
        `;

        // اضافه کردن به body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modalElement = document.getElementById(`modal-${id}`);
        const closeButton = modalElement?.querySelector('.modal-close');

        // اضافه کردن event listener برای دکمه بستن
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close(id));
        }

        this.modals.set(id, {
            element: modalElement,
            closeOnOverlayClick
        });
    }

    /**
     * باز کردن مودال
     * @param {string} id - شناسه مودال
     */
    open(id) {
        const modal = this.modals.get(id);
        if (!modal) {
            console.error(`Modal with id "${id}" not found`);
            return;
        }

        const { element } = modal;
        element.style.display = 'flex';
        
        // تاخیر کوتاه برای animation
        setTimeout(() => {
            element.classList.add('active');
        }, 10);

        // جلوگیری از scroll صفحه پشت
        document.body.style.overflow = 'hidden';
    }

    /**
     * بستن مودال
     * @param {string} id - شناسه مودال
     */
    close(id) {
        const modal = this.modals.get(id);
        if (!modal) {
            console.error(`Modal with id "${id}" not found`);
            return;
        }

        const { element } = modal;
        element.classList.remove('active');
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);

        // بازگرداندن scroll
        document.body.style.overflow = '';
    }

    /**
     * بستن تمام مودال‌ها
     */
    closeAll() {
        this.modals.forEach((modal, id) => {
            this.close(id);
        });
    }

    /**
     * حذف همه مودال‌ها از DOM و پاک کردن map
     */
    clearAllModals() {
        this.modals.forEach((modal) => {
            if (modal.element && modal.element.parentNode) {
                modal.element.remove();
            }
        });
        this.modals.clear();
    }

    /**
     * به‌روزرسانی محتوای مودال
     * @param {string} id - شناسه مودال
     * @param {string} content - محتوای جدید HTML
     */
    updateContent(id, content) {
        const modal = this.modals.get(id);
        if (!modal) {
            console.error(`Modal with id "${id}" not found`);
            return;
        }

        const body = modal.element.querySelector('.modal-body');
        if (body) {
            body.innerHTML = content;
        }
    }
}

// ایجاد instance جهانی
const modalManager = new ModalManager();

// اضافه کردن به window برای دسترسی آسان
window.ModalManager = modalManager;

// مثال استفاده:
// modalManager.create('demo', 'عنوان مودال', '<p>محتوای مودال</p>');
// modalManager.open('demo');
// modalManager.close('demo');

