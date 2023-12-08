module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'airbnb',
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: { sourceType: 'script' }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: { React: 'writable' },
  rules: {
    'eslint/fix-on-save': 0,
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'react/function-component-definition': 0,
    'jsx-a11y/label-has-associated-control': 0,
    camelcase: 'off',
    radix: 'off',
    indent: ['error', 2],
    quotes: ['warn', 'single'],
    'react/prop-types': 'off',
    'import/no-unresolved': 0,
    'consistent-return': 'off',
    'react/destructuring-assignment': ['warn', 'always'],
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
    'no-console': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-param-reassign': 0,
    'react/no-array-index-key': 'off',
    'no-plusplus': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'react/button-has-type': 'off',
    'func-names': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'max-len': 'off',
    'indent-legacy': ['error', 2],
    'comma-dangle': ['error', 'never'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, minProperties: 4 },
        ObjectPattern: { multiline: true, minProperties: 4 },
        ImportDeclaration: { multiline: true, minProperties: 4 },
        ExportDeclaration: { multiline: true, minProperties: 4 }
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: false,
          object: true
        }
      }
    ]
  }
};
