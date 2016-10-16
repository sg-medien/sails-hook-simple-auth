module.exports = {
  "extends": "airbnb",
  "plugins": [
	"jsx-a11y",
	"import"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "valid-typeof": "off",
    "max-len": [1, 150, 2, {ignoreComments: true}]
  }
};