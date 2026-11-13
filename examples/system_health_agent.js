/**
 * Example agent workflow demonstrating automated host health inspection,
 * metrics collection, and alerting with OpenBot.
 */

class SystemHealthAgent {
  constructor(options = {}) {
    this.checkIntervalMs = options.checkIntervalMs || 60000;
    this.thresholds = {
      cpuMaxPercent: options.cpuThreshold || 85,
      memoryMaxPercent: options.memoryThreshold || 90,
      diskMaxPercent: options.diskThreshold || 85
    };
    this.history = [];
  }

  async collectMetrics() {
    return {
      timestamp: new Date().toISOString(),
      cpuPercent: Math.round(Math.random() * 20 + 20),
      memoryPercent: Math.round(Math.random() * 15 + 40),
      diskPercent: 54,
      status: 'healthy'
    };
  }

  evaluateAlerts(metric) {
    const alerts = [];
    if (metric.cpuPercent > this.thresholds.cpuMaxPercent) {
      alerts.push(`High CPU utilization: ${metric.cpuPercent}%`);
    }
    if (metric.memoryPercent > this.thresholds.memoryMaxPercent) {
      alerts.push(`High memory utilization: ${metric.memoryPercent}%`);
    }
    return alerts;
  }

  async runHealthCheck() {
    const metrics = await this.collectMetrics();
    const alerts = this.evaluateAlerts(metrics);
    this.history.push({ ...metrics, alerts });
    return { metrics, alerts, passed: alerts.length === 0 };
  }
}

module.exports = { SystemHealthAgent };

if (require.main === module) {
  const agent = new SystemHealthAgent();
  agent.runHealthCheck().then(res => {
    console.log('Health check executed:', JSON.stringify(res, null, 2));
  });
}
