'use strict';
const fs = require('fs');
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
	initializing() {
		this.globalStore = this.options.__store;
	}

	prompting() {
		const prompts = [
			{
				type: 'input',
				name: 'projectName',
				message: 'Your project name',
				default: this.appname
			}
		];

		return this.prompt(prompts).then(props => {
			this.props = props;
		});
	}

	configuring() {
		if (this.globalStore) {
			this.globalStore.set('name', this.props.projectName);
		} else {
			this.config.set('name', this.props.projectName)
		}
	}

	writing() {
		this.fs.copyTpl(this.templatePath('gitignore'), '.gitignore');
		this.fs.copyTpl(this.templatePath('editorconfig'), '.editorconfig');
	}
};
