from pathlib import Path

path = Path('app/page.tsx')
text = path.read_text(encoding='utf-8')
old = """  {
    label: 'Email',
    href: 'mailto:ahmedch8990@gmail.com',
  },
  {
    label: 'Phone',
    href: 'tel:+923411003874',
  },
];
"""
new = """  {
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
"""
if old not in text:
    raise SystemExit('Pattern not found')
path.write_text(text.replace(old, new), encoding='utf-8')
print('updated')
