const http = require("k6/http");
const k6 = require("k6");

export const options = {
    scenarios: {
      high_load_1: {
        executor: 'constant-vus',
        vus: 5000,
        duration: '5m',
        startTime: '0s',
      },
    },
    thresholds: {
        http_req_duration: ["p(100)<5000"],
        http_req_failed: ["rate==0"]
    }
  };

function testLoyalty() {
    const res = http.post('http://localhost:3000/loyalty');
    k6.check(res, {
        'status_was_200': function (r) { return r.status === 200; },
        'transaction_less_or_5': function (r) { return r.timings.duration <= 5000; },
        'transaction_more_than_5': function (r) { return r.timings.duration > 5000; },
    })
}

exports.default = testLoyalty;
