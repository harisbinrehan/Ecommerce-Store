module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'airbnb'],
  parser: 'espree',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'react/function-component-definition': 0,
    'jsx-a11y/label-has-associated-control': 0,
    camelcase: 'off',
    radix: 'off',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'react/prop-types': 'off',
    'import/no-unresolved': 0,
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
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'max-len': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'indent-legacy': ['error', 2],
    'comma-dangle': ['error', 'never'],
    'new-cap': 'off',
    'default-case': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 2
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 2
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 2
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 2
        }
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
