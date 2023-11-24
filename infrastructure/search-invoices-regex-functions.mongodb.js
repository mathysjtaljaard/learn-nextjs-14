/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("nextjs-training");

// Search for documents in the current collection.
db.getCollection("invoices").find(
  {
    $or: [
      { status: /nov /gi },
      {
        $expr: {
          $function: {
            body:
              "function body(amount, regexTerm) {\n" +
              " return (amount.toString().match(regexTerm) !== null);\n" +
              " }",
            args: ["$amount", /nov /gi],
            lang: "js",
          },
        },
      },
      {
        $expr: {
          $function: {
            body:
              "function body(date, regexTerm) {\n" +
              " try {\n" +
              " var options = {timeZoneName: 'short', timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }\n" +
              " var locale = 'en-US'\n" +
              " var dateValue = new Date(date).toLocaleString(undefined, options)\n" +
              " var subString = dateValue.substring(0, dateValue.length - 14)\n" +
              " print(subString)\n" +
              " return (subString.match(regexTerm) !== null);\n" +
              " } catch (e) {\n" +
              " return false\n" +
              " }\n" +
              " }",
            args: ["$date", /dec.*6/gi],
            lang: "js",
          },
        },
      },
    ],
  },
  { limit: 6 }
);
