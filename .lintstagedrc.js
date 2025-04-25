module.exports = {
  '*.ts': [
    'eslint --fix',
    'jest --findRelatedTests --passWithNoTests'
  ],
  '*.{json,md}': ['prettier --write']
};