# Metronode Command Line Utility

We built this cli to help generate node apps using the app standard we find to greatly improve our productivity. The project is based on typescript and nodejs environments.

## Usage

```bash

metronode new <<projectname>> --destination <<destination>>

```

`projectname` refers to a unique string to use to name the project you want to create

### Validation

Your project name must meet the following naming standard

1. Use letters
2. Not contain random symbols (but it can include an underscore)
3. Not start with a number (but it can include numbers)

#### Sample Project Names

```js
test_project;
projectToday;
project;
```
