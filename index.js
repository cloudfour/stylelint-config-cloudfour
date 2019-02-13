"use strict";

module.exports = {
  extends: "stylelint-config-suitcss",
  rules: {
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["blockless-after-blockless"],
        ignoreAtRules: ["custom-media", "mixin", "import", "for"]
      }
    ],
    "comment-empty-line-before": [
      "always",
      {
        except: ["first-nested"]
      }
    ],
    "max-line-length": [
      80,
      {
        ignore: "non-comments",
        ignorePattern: "/https?://[0-9,a-z]*.*/"
      }
    ],
    "rule-empty-line-before": [
      "always-multi-line",
      {
        except: ["first-nested"]
      }
    ]
  }
};
