import axios from 'axios'
let datafeed = {
  onReady: function (configurationData) {
    configurationData({
      supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
      supports_marks: true,
      supports_search: true,
      supports_time: true,
      supports_timescale_marks: true,
    })
    return null
  },
  calculateHistoryDepth: function (resolution, resolutionBack, intervalBack) {
    return {
      resolutionBack: 'M',
      intervalBack: 6
    }
  },
  getMarks (symbolInfo, startDate, endDate, onDataCallback, resolution) {
  },
  resolveSymbol: function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    onSymbolResolvedCallback({
      name: symbolName,
      description: symbolName,
      has_intraday: true,
      ticker: symbolName,
      session: '0930-1630:1234567',
      has_daily: true,
      has_weekly_and_monthly: true,
      data_status: 'streaming',
      has_no_volume: false,
      volume_precision: 0,
      currency_code: true,
      minmov: 1,
      minmov2: 0,
      pointvalue: 1,
      pricescale: 10000
    })
  },
  getBars (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
    let date = this.dealDate(resolution)
    console.log(date)
    if (firstDataRequest) {
      axios.get('/market/history/kline?symbol=' + symbolInfo.name + '&period=' + date.time + '&size=1000').then(function (res) {
        let data = res.data.data ? res.data.data : []
        let arr = []
        for (let i = 0; i < data.length; i++) {
          arr.unshift({time: data[i].id * 1000, close: data[i].close, open: data[i].open, high: data[i].high, low: data[i].low, volume: data[i].vol})
        }
        onHistoryCallback(arr)
      })
    } else {
      onHistoryCallback([], {noData: true})
    }
  },
  subscribeBars (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback){
  },
  unsubscribeBars (subscriberUID) {
  },

  dealDate: function(resolution) {
    switch (resolution) {
      case '1':
        return {time: '1min'}
        break
      case '5':
        return {time: '5min'}
        break
      case '15':
        return {time: '15min'}
        break
      case '30':
        return {time: '30min'}
        break
      case '60':
        return {time: '60min'}
        break
      case '1D':
        return {time: '1day'}
        break
      case '1W':
        return {time: '1week'}
        break
      case '1M':
        return {time: '1mon'}
        break
    }
  }
}

export {datafeed}
