import fs from 'fs';

// Tailwind rounded class → CSS border-radius value
const RADIUS_MAP = {
  'rounded-full': '9999px',
  'rounded-3xl': '24px',
  'rounded-2xl': '16px',
  'rounded-xl': '12px',
  'rounded-lg': '8px',
  'rounded-md': '6px',
  'rounded-sm': '2px',
  'rounded': '4px',
};

// Partial rounded classes → specific corners
const PARTIAL_MAP = {
  'rounded-t-3xl': { borderTopLeftRadius: '24px', borderTopRightRadius: '24px' },
  'rounded-t-2xl': { borderTopLeftRadius: '16px', borderTopRightRadius: '16px' },
  'rounded-b-2xl': { borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' },
  'rounded-b-none': { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' },
  'rounded-r-full': { borderTopRightRadius: '9999px', borderBottomRightRadius: '9999px' },
  'rounded-l-full': { borderTopLeftRadius: '9999px', borderBottomLeftRadius: '9999px' },
  'rounded-l-lg': { borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' },
  'rounded-r-lg': { borderTopRightRadius: '8px', borderBottomRightRadius: '8px' },
};

function getRadiusStyle(classStr) {
  const style = {};

  // Check partial classes first
  for (const [cls, props] of Object.entries(PARTIAL_MAP)) {
    if (classStr.includes(cls)) {
      Object.assign(style, props);
    }
  }

  // Check full border-radius classes (only if no partial ones matched for borderRadius)
  if (!style.borderTopLeftRadius && !style.borderBottomLeftRadius) {
    // Sort by specificity (longest match first)
    for (const [cls, value] of Object.entries(RADIUS_MAP)) {
      // Use word boundary check to avoid partial matches like rounded-lg matching rounded-l-lg
      const regex = new RegExp(`(^|\\s|max-md:)${cls.replace('-', '\\-')}($|\\s)`);
      if (regex.test(classStr)) {
        style.borderRadius = value;
        break;
      }
    }
  }

  return Object.keys(style).length > 0 ? style : null;
}

function styleObjToString(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${k}: '${v}'`)
    .join(', ');
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changeCount = 0;

  // Pattern: className="..." or className={`...`} that contains rounded-
  // We need to find JSX elements with rounded classes and add/merge style props

  // Strategy: Find each line with 'rounded-' in a className, determine the radius,
  // and add style prop if not already present

  const lines = content.split('\n');
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (!line.includes('rounded-') && !line.match(/\brounded\b/)) {
      newLines.push(line);
      continue;
    }

    // Skip lines that already have inline borderRadius
    if (line.includes('borderRadius')) {
      newLines.push(line);
      continue;
    }

    // Extract all rounded classes from this line
    const roundedClasses = line.match(/rounded(?:-[a-z0-9]+)*/g);
    if (!roundedClasses) {
      newLines.push(line);
      continue;
    }

    const classStr = roundedClasses.join(' ');
    const radiusStyle = getRadiusStyle(classStr);

    if (!radiusStyle) {
      newLines.push(line);
      continue;
    }

    const styleStr = styleObjToString(radiusStyle);

    // Check if there's already a style prop on this line or nearby lines
    // Look for the closing > of the element to add style before it
    // Simple case: the className and closing are on the same line or we add style after className

    if (line.includes('style=')) {
      // Already has style, try to merge
      if (line.includes('style={{')) {
        line = line.replace('style={{', `style={{ ${styleStr}, `);
        changeCount++;
      }
    } else {
      // Add style prop after className
      // Handle className="..." pattern
      if (line.match(/className="[^"]*"/)) {
        line = line.replace(/(className="[^"]*")/, `$1 style={{ ${styleStr} }}`);
        changeCount++;
      }
      // Handle className={`...`} pattern
      else if (line.match(/className=\{`[^`]*`\}/)) {
        line = line.replace(/(className=\{`[^`]*`\})/, `$1 style={{ ${styleStr} }}`);
        changeCount++;
      }
      // Handle className={...} pattern (dynamic)
      else if (line.match(/className=\{/)) {
        line = line.replace(/(className=\{[^}]*\})/, `$1 style={{ ${styleStr} }}`);
        changeCount++;
      }
    }

    newLines.push(line);
  }

  if (changeCount > 0) {
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log(`${filePath}: ${changeCount} changes`);
  } else {
    console.log(`${filePath}: no changes needed`);
  }
}

const files = [
  'src/components/ExplorePage.jsx',
  'src/components/JobDetailPage.jsx',
  'src/components/FilterModal.jsx',
  'src/components/JobCard.jsx',
  'src/components/Sidebar.jsx',
  'src/components/Navbar.jsx',
];

for (const f of files) {
  processFile(f);
}
