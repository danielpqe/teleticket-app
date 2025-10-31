import scanner from 'sonarqube-scanner';

scanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.token': 'sqp_f487cf4b1dc8c745050685e2dc4f6989390862e7',
      'sonar.projectKey': 'teleticket-app',
      'sonar.projectName': 'Teleticket App',
      'sonar.projectVersion': '1.0',

      'sonar.sources': 'src',
      'sonar.tests': 'test',
      'sonar.test.inclusions': '**/*.spec.ts',
      'sonar.exclusions': '**/node_modules/**,dist/**',

      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
    },
  },
  () => process.exit(),
);
