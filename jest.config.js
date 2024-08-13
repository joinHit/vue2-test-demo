module.exports = {
  preset: '@vue/cli-plugin-unit-jest'
  /** 收集测试覆盖率
   *
   * 但不建议使用此种方式（在 "jest配置文件"）来做 "测试覆盖率"
   * 因为这样会造成 "在开发阶段" 也会 "生成覆盖率"，从而影响开发效率
   * 我们只是想 push代码时，才 "生成覆盖率"；而不是开发阶段，就时刻 "生成覆盖率"
   */
  // collectCoverage: true
}
