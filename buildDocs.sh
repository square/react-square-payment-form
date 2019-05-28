#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var reactDocs = require('react-docgen');
var reactDocsTypescript = require('react-docgen-typescript');
var glob = require("glob")

glob("src/components/**/*.tsx", function (err, files) {
  if (err) throw err;

  files.forEach(function(file, index) {
    fs.readFile(file, function read(err, data) {
        if (err) {
          throw err;
        }

        var name = componentName(file)

        if (data.indexOf('React.Component') === -1 && data.indexOf('React.FunctionComponent') === -1) {
          return
        }

        // react-docgen-typescript does display default props correctly so use both libraries to parse the files
        var typescriptParse = reactDocsTypescript.parse(file)
        var reactParse = reactDocs.parse(data)
        var markdown = generateMarkdown(name, typescriptParse[0], reactParse)
        var outPath = __dirname + '/docs/' + name + '.md'
        fs.writeFileSync(outPath, markdown)
    })
  })
})

function componentName(filepath) {
  var name = path.basename(filepath);
  var ext;
  while ((ext = path.extname(name))) {
    name = name.substring(0, name.length - ext.length);
  }
  return name;
}

function generateDescription(description) {
  return description;
}

function generatePropDescription(description, defaultValue) {
  if (defaultValue) {
    return description + '<br/><br/>**Default Value:**' + defaultValue
  }
  return description
}

function generatePropDefaultValue(value) {
  var defaultValue = value.value
  defaultValue = defaultValue.replace(/[\n\t\r]/g, '')
  return '`' + defaultValue + '`';
}

function generatePropType(type) {
  let values;
  if (Array.isArray(type.value)) {
    values = '(' + type.value.map(function(typeValue) { return typeValue.name || typeValue.value; }).join('|') + ')';
  } else {
    values = type.value;
  }
  return type.name + (values ? values : '');
}
function generateProp(propName, prop, reactProp) {
  const columns = [
    propName,
    generatePropType(prop.type),
    generatePropDescription(
      prop.description,
      (reactProp && reactProp.defaultValue ? generatePropDefaultValue(reactProp.defaultValue) : '')
    )
  ]
  return '|' + columns.join('|') + '|'
}

function generateProps(props, reactProps) {
  if (!props) return '';
  return [
    '## Props',
    '|Name|Type|Description|',
    '|---|---|---|',
    Object.keys(props)
      .sort()
      .map(function(propName) {
        return generateProp(propName, props[propName], reactProps && reactProps[propName])
      }).join('\n')
  ].join('\n')
}

function generateMarkdown(name, typescriptAPI, reactAPI) {
  return [
    generateDescription(typescriptAPI.description),
    generateProps(typescriptAPI.props, reactAPI.props)
  ].join('\n')
}
