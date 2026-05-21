const fs = require('fs');
const path = require('path');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Files and directories to copy
const itemsToCopy = [
    'index.html',
    'about.html',
    'css',
    'js',
    'assets'
];

// Copy function
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copy items
itemsToCopy.forEach(item => {
    const src = path.join(__dirname, item);
    const dest = path.join(distDir, item);
    
    if (fs.existsSync(src)) {
        console.log(`Copying ${item}...`);
        copyRecursiveSync(src, dest);
    }
});

console.log('\n✅ Build completed successfully!');
console.log(`📦 Output directory: ${distDir}`);

