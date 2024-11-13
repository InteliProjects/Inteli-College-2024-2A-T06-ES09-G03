const http = require("k6/http");
const k6 = require("k6");

export const options = {
    scenarios: {
      high_load_1: {
        executor: 'constant-vus',
        vus: 10000,
        duration: '0.1m',
        startTime: '0s',
      },
    },
    thresholds: {
        http_req_duration: ["p(100)<2000"],
        http_req_failed: ["rate<0.02"]
    }
  };

function testLoyalty() {
    const res = http.get('http://localhost:3000/campain');
    k6.check(res, {
        'status_was_200': function (r) { return r.status === 200; },
        'transaction_less_or_2': function (r) { return r.timings.duration <= 2000; },
        'transaction_more_than_2': function (r) { return r.timings.duration > 2000; },
    })
}

exports.default = testLoyalty;
