module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    jest: true,
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    'no-console': ['error'],

    // [OVERRIDDEN] allow unused function arguments
    // disallow declaration of variables that are not used in the code
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^Promise$',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],

    // [OVERRIDDEN] Allow exporting single non-default export
    // Require modules with a single export to use a default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',


    // supporting windows
    'linebreak-style': 'off',

    // [OVERRIDDEN] Allow using _id
    // disallow dangling underscores in identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id', '__'],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
      },
    ],

    // [OVERRIDDEN] Disallow comma dangle in functions
    // require trailing commas in multiline object literals
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],

    // [OVERRIDDEN] Allow unnamed functions if they are associated with a reference
    // https://eslint.org/docs/rules/func-names
    'func-names': ['warn', 'as-needed'],

    // [OVERRIDDEN] Increase min properties for line breaks in objects
    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 6, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 6, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    }],

    // [OVERRIDDEN] Modify to allow usage inside any nested test/ or tests/ directories
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'test/**', // tape, common npm pattern
        'tests/**', // also common npm pattern
        'spec/**', // mocha, rspec-like pattern
        '**/__tests__/**', // jest pattern
        '**/__mocks__/**', // jest pattern
        'test.{js,jsx}', // repos with a single test file
        'test-*.{js,jsx}', // repos with multiple top-level test files
        '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
        '**/jest.config.js', // jest config
        '**/jest.setup.js', // jest setup
        '**/vue.config.js', // vue-cli config
        '**/webpack.config.js', // webpack config
        '**/webpack.config.*.js', // webpack config
        '**/rollup.config.js', // rollup config
        '**/rollup.config.*.js', // rollup config
        '**/gulpfile.js', // gulp config
        '**/gulpfile.*.js', // gulp config
        '**/Gruntfile{,.js}', // grunt config
        '**/protractor.conf.js', // protractor config
        '**/protractor.conf.*.js', // protractor config
        // Added rules are below this line
        '**/test/**',
        '**/tests/**',
        'scripts/**',
        'seeds/**',
      ],
      optionalDependencies: false,
    }],

    // [OVERRIDDEN] allow only in for loops
    // disallow use of unary operators, ++ and --
    // https://eslint.org/docs/rules/no-plusplus
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    // [OVERRIDDEN] Increase max length to 120
    // specify the maximum length of a line in your program
    // https://eslint.org/docs/rules/max-len
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    // [OVERRIDDEN] Enforce parens for arrow functions only when there are more than 1 arguments
    // Require parens in arrow functions arguments
    // https://eslint.org/docs/rules/arrow-parens.html
    'arrow-parens': ['error', 'as-needed'],

    // [CUSTOM] Enforce the usage of curly braces in all blocks, even if it is a one line body
    // https://eslint.org/docs/rules/curly
    curly: ['error', 'all'],

    // [CUSTOM] restrict the use of the logJson function.
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.name='logJson']",
        message: 'logJson is not allowed',
      },
      {
        selector: "CallExpression[callee.name='logKeys']",
        message: 'logKeys is not allowed',
      },
    ],

    // [OVERRIDDEN] Restore old behavior of airbnb
    // Allow 2 blank lines at most, no blank line at the begin/end of files
    // https://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0, maxBOF: 0 }],

    'import/extensions': [
      'error',
      'always',
      {
        js: 'always',
      },
    ],

    'import/no-unresolved': [
      'error',
      {
        ignore: ['http-status', 'change-case'],
      },
    ],

    camelcase: [
     'off'
    ],
    'no-return-assign': ['off'],
  },
};
