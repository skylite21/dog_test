module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": false
      },
      "ecmaVersion": 2017
    },
    "plugins": [
      "import"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "no-console": 0,
        "no-undef": 0,
        "linebreak-style": 0,
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": 0
    }
};
