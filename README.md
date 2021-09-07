<span align="center">
    <h1 align="center">Furnater</h1>
    <img src="https://i.imgur.com/HnTEZ4M.png" height="128">
    <p align="center">It's time to feel lightweight in styling... Yes furnater is tool that can generate only class which you need and is generation tool to work faster with styled components.</p>
</span>

## About
* Version: 1.0.0

## Examples
* Stylesheet definitions generation

** Input html File **

```html
<div class="my-2em"></div>
```

** Output styles **

```css
.my-2em {
    margin-top: 2em;
    margin-bottom: 2em;
}
```

* Join styles into one class definitions if too much classes

** Input html File **

```html
<div class="my-2em px-3rem d-p va-m"></div>
```

** Output html File **

```html
<div class="component-892821"></div>
```

** Output styles **

```css
.component-892821 {
    margin-top: 2em;
    margin-bottom: 2em;
    padding-top: 3rem;
    padding-bottom: 3rem;
    display: block;
    vertical-align: middle
}
```

* Styles usage statistic, good practices and performance and compatibility!

## Authors
* Adrian Błasiak (@grano22) - Furnater base