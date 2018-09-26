# iconsets.org

**Icon set discovery website for designers**

Looking for an icon set for your next website? [iconsets.org](https://iconsets.org) features a curated list of pretty icon sets.

To help you find the icon set which suits your needs, the website lets you filter icon sets by format, license, and price. All sets are presented with sample icons, and you can test their appearance on light and dark backgrounds.  

![Screenshots](screenshots.png)


## Adding an icon set

Do you know a great icon set that you'd like to add to the list?

1. Fork and clone this repository
2. Add the following information about your icon set to the [`icon-sets.json`](icon-sets.json) file. Please insert your list entry such that the list is sorted by `id`.

```js
{
  "id": "icon-set-name-in-kebab-case",
  "name": "Icon set name",
  "url": "https://www.example.com",
  "date": "YYYY-MM-DD", // today's date
  "svg": true | false,
  "png": true | false,
  "font": true | false,
  "license": "MIT" | "CC BY 4.0" | "multiple" | ...,
  "price": "free" | "partly free" | "paid"
}
```

3. Add six sample icons of your icon set under `public/sample-icons/[set-id]/sample-icon-[1-6].svg`. Please make sure of the following:
    * The SVG needs to contain `id="icon"` (because it is loaded with `<use>`)
    * The SVG must have the `viewBox` attribute set correctly (according to its height/width)
4. Run the web app and test whether the icon set is rendered correctly (see [Development](#development))
5. Create a pull request


## Development

Clone the project and install all dependencies:

1. `git clone`
2. `pipenv install --dev`
3. `pipenv run pre-commit install`
4. `yarn install`

Bundle the JavaScript files with Webpack and start the Flask server:

`FLASK_ENV=development pipenv run start` and `yarn start`

The app is now running on `localhost:3000`.


## Credits

"Glowing star" emoji by [Twitter, Inc. (Twemoji)](https://github.com/twitter/twemoji), licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0)
