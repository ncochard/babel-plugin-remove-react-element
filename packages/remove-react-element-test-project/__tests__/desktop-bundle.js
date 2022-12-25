const fs = require('fs');
const path = require('path');

test('The desktop bundle should contain the correct markup', () => {
    const bundle = path.join(__dirname, "..", "dist", "desktop", 'app.js');
    const data = fs.readFileSync(bundle, {encoding:'utf8', flag:'r'});
    expect(data).toContain("This will show on desktops.");
    expect(data).not.toContain("This will show on mobile.");
});