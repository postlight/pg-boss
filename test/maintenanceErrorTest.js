const PgBoss = require('../')

describe('maintenance error handling', function () {
  this.retries(1)

  it('maintenance error handling works', function (done) {
    const defaults = {
      monitorStateIntervalMinutes: 1,
      maintenanceIntervalSeconds: 1,
      __test__throw_maint: true
    }

    const config = { ...this.test.bossConfig, ...defaults }
    const boss = new PgBoss(config)

    const onError = (err) => {
      if (err && boss.isStarted) {
        boss.stop().then(() => done()).catch(done)
      } else {
        done(err)
      }
    }

    boss.on('error', onError)

    boss.start().catch(done)
  })

  it('state monitoring error handling works', function (done) {
    const defaults = {
      monitorStateIntervalSeconds: 1,
      maintenanceIntervalMinutes: 1,
      __test__throw_monitor: true
    }

    const config = { ...this.test.bossConfig, ...defaults }
    const boss = new PgBoss(config)

    const onError = (err) => {
      if (err && boss.isStarted) {
        boss.stop().then(() => done()).catch(done)
      } else {
        done(err)
      }
    }

    boss.on('error', onError)

    boss.start().catch(done)
  })
})
