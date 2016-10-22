const inquirer = require('inquirer');
const path = require('path');
const webpack = require('webpack');

const devtools = [
	'eval',
	'cheap-eval-source-map',
	'cheap-source-map',
	'cheap-module-eval-source-map',
	'cheap-module-source-map',
	'eval-source-map',
	'source-map'
];

const prompts = [
	{
		type: 'list',
		name:'devtool',
		message:'Choose a devtool',
		choices: devtools
	}
];

const configMaker = ( target, devtool, filename ) => ({
	entry: './index.js',
	target: target,
	devtool: devtool,
	output: {
		path: path.join(__dirname, 'build'),
		filename: filename
	}
});


inquirer.prompt(prompts).then(function (answers) {
	webpack(
		configMaker( 'node', answers.devtool, 'server.js')
	,() => {});

	webpack(
		configMaker( 'web', answers.devtool, 'client.js')
	,() => {});
});
