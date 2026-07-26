const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'app', 'page.tsx');
let text = fs.readFileSync(filePath, 'utf8');
const oldPart = `  {
    label: 'Email',
    href: 'mailto:ahmedch8990@gmail.com',
  },
  {
    label: 'Phone',
    href: 'tel:+923411003874',
  },
];
`;
const newPart = `  {
    label: 'Email',
    href: 'mailto:ahmedch8990@gmail.com',
  },
  {
    label: 'Phone',
    href: 'tel:+923411003874',
  },
  {
    label: 'Location',
    href: 'https://www.google.com/maps/search/Pakistan',
  },
];
`;
if (!text.includes(oldPart)) {
  throw new Error('Pattern not found');
}
text = text.replace(oldPart, newPart);
fs.writeFileSync(filePath, text, 'utf8');
console.log('updated');
