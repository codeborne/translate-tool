# Translate Tool

[![Build & Test](https://github.com/codeborne/translate-tool/actions/workflows/ci.yml/badge.svg)](https://github.com/codeborne/translate-tool/actions/workflows/ci.yml)

This tool allows translators to quickly and conveniently translate JSON language files.

- Add translation files from any public URL
- BitBucket and GitHub support (reading, pulls, commits, pull requests & branches)
- Google Translate support
- Optional Google authentication (can see commit author)
- Add new keys in the same order as in the UI
- Whitelisted email domains
- Warnings if key is not in default language file
- Warnings if {placeholders} are missing
- Detect HTML tags within text
- Raw HTML/styled previews
- Multiple project tabs & project sharing via link

Built with Svelte, TypeScript, Vite & Express

## Demo

Here's a [demo project](https://translate.codeborne.com/?shared=eyJ0aXRsZSI6IkRlbW8iLCJ1cmwiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vVXB0YWtlci9pMThuLXB1YmxpYy9tYWluL2kxOG4vIiwiaW5kZW50IjoyfQ==). Signing in with any Gmail account is required, so you may have to paste the link again after logging in.

The project is saved to your local storage, so you no longer require the shareable link to access it.

---
## Using the tool

### File structure

The same structure is supported by [@codeborne/i18n-json](https://github.com/codeborne/i18n-json) npm package, which can be used by your application.

#### langs.json

Your translation directory must contain a `langs.json` file with an array of languages, such as:
```json
["en", "pl", "fr", "de"]
```
The first language in the array, in this case `en`, will be the default language and all other translations will follow its JSON structure.

#### Translation files
Along with `langs.json`, each language must have a separate JSON file with the language as its file name. Here's an example of a complete file structure:

```
 langs.json
 en.json
 de.json
 pl.json
 fr.json
```

The default language, `en`, as defined by being the first language in `langs.json`, may have any JSON structure you like.

Here's an example `en.json`

```json5
"general": {
  "yes": "Yes",
  "no": "No",
  "edit": "Edit",
  "remove": "Remove",
  "save": "Save",
  "filter": {
    "today": "Today",
    "yesterday": "Yesterday",
    "thisWeek": "This week",
    "thisMonth": "This month",
    "thisYear": "This year",
  }
},
"forbidden": {
  "message": "Access denied!"
},
"notfound": {
  "home": "Home page",
  "message": "Page Not Found"
}
```

The rest of the files, in this case `de.json`, `fr.json`, `pl.json`, can start off with an empty object until it gets populated by the tool:
```
{}
```

### Project config
Before you start translating, you require a project config. This config holds all the relevant information to edit your translations.

For most, it is much easier to generate it from the tool itself by using the project importing option. 
Alternatively, you may follow this JSON structure:

```json
{
  "title": "Project1",
  "url": "https://somelink.com/myproject/translations/",
  "token": "some_access_token_mdasKn23nSDJDnNSm",
  "indent": 2
},
{
  "title": "Project2 Common",
  "url": "https://somelink.com/myproject2/translations/common/",
  "indent": 4
}
```

* `title` is the project name within the tool.
* `url` is the url where your translation directory resides.
* `indent` is the space indentation. The default is always 2 when starting a new project via the tranlate tool.
* `token` (optional) is the access token to access a protected url, such as a private GitHub repository. More on that below.

### Integrating with GitHub/BitBucket.

This tool supports using a GitHub and BitBucket repositories to fetch and then commit the changes when you're done.

Various projects usually have a defined file structure where all translations are stored in JSON.

Here is an example project file structure.
The **translations** directory holds all the project translations and will be targeted by this tool.
```
project
│   README.md
│   file001.txt
│
└───src
│   │   file011.txt
│   │   file012.txt
│   │
│   └───subfolder1
│       │   file111.txt
│       │   file112.txt
│       │   ...
│   
└───translations
    │   langs.json
    │   en.json
    │   de.json
    │   pl.json
    │   fr.json
```

---
#### Private repositories


Private repositories require a **private access token** to view a repository's contents. You can generate one for your GitHub account by accessing  your profile and navigating to
```
Settings -> Developer Settings -> Personal access tokens
```

To integrate the project with GitHub, simply use the translate tool's **Import via Github** option and fill the necessary fields.

Same concept applies to BitBucket

```
BitBucket's Workspace settings > OAuth Consumers and combine the Key and Secret to be Key:Secret, eg KB42ebc8rt64b0k9MV:kud7Nsklf93JK2lsKnNs2kNfgXA2n
```
#### Public repositories

For public repositories, you can simply use the **Import via public url** option give the RAW file GitHub URL

Here's an example:
```
https://raw.githubusercontent.com/<User>/<Repo>/main/translations/
```

---
## Setup & Deployment

Requires **node**, **docker** and **docker-compose** to be installed.

### Running it

Navigate to the root directory.

Build the project
```
docker-compose build
```

Start it on port 8999
```
docker-compose up
```

Open http://localhost:8999 to use the tool.

### Optional features

#### Google Authentication

You can make it so only logged in users can access the app, or whitelist individual emails and email domains.

To do so, create a dotfile named `.env` with the following environment variables and docker-compose will automatically pick it up. Alternatively, you can use any other method of your choice (eg during CI/CD)

```
GOOGLE_CLIENT_ID=Google OAuth client ID, used for optional authentication
GOOGLE_CLIENT_SECRET=Google OAuth client secret, used for optional authentication
COOKIE_SECRET=Secret for cookie signing, create your own, used for optional authentication
```

Use your existing or create new Google Cloud Platform credentials (API & Services -> Create Credentials -> OAuth Client ID -> Web Application) to fill the variables

Then add these addresses as *Authorized redirect URI's* in Google Cloud Platform.
```
http://localhost:8999/
http://localhost:8999/auth/
```

Replace localhost/port with your actual domain host. Can take some time after applying the changes!

#### Whitelisted emails and email domains

*Requires Google Authentication to be set up

In `server/config.ts`, there are two fields which let you add emails

```
  ALLOWED_DOMAINS: [],
  ALLOWED_EMAILS: []
```

Adding just a single email/domain will restrict everybody else not included here. Here's an example:

```
  ALLOWED_DOMAINS: ['codeborne.com'],
  ALLOWED_EMAILS: ['hello@example.com','world@example.com']
```

#### Predefined projects

You can create a predefined project config and use it to always load them by default. Note that this will always override any other projects saved.

`docker build --build-arg PROJECTS_FILE=your/projects/location/projects.json .`

_**NB!**_ As a security measure, the server will not run if there are predefined projects present with no authentication set up. 

#### Tag as HTML

End a key with `Html` to be able to switch between HTML and styled text within the UI.

eg `main.aboutHtml` or `main.contentHtml.support`

#### Marking keys that should not be translated

You can mark certain keys to not be available for translation. They can still in the default language file, but will not show up in other languages.

Create a `dont-translate-keys.json` file in the root folder and add the full keys with double quotes like so:
```json
["companyInfo", "dont.translate.this.title"]
```

This will also exclude objects. If `companyInfo` was an object that contained multiple keys, such as
`companyInfo.phone`, `companyInfo.mail` etc, it would also mark them as untranslatable. 

## Available Scripts

Make sure to `npm install` to install the required dependencies

### npm start

Runs the app in the development mode.
Open http://localhost:8999 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm test

Launches the test runner in the interactive watch mode.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!
