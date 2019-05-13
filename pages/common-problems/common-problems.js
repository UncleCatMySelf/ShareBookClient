Page({
  data: {
    item_isExpanded: true,
    item_isExpanded2: true,
    item_isExpanded3: true,
    item_isExpanded4: true,
    item_isExpanded5: true,
    item_isExpanded6: true,
    item_isExpanded7: true,
  },
  onLoad: function (e) {

  },
  onToggle: function () {
    this.setData({
      item_isExpanded: !this.data.item_isExpanded
    })
  },
  onToggle2: function () {
    this.setData({
      item_isExpanded2: !this.data.item_isExpanded2
    })
  },
  onToggle3: function () {
    this.setData({
      item_isExpanded3: !this.data.item_isExpanded3
    })
  },
  onToggle4: function () {
    this.setData({
      item_isExpanded4: !this.data.item_isExpanded4
    })
  },
  onToggle5: function () {
    this.setData({
      item_isExpanded5: !this.data.item_isExpanded5
    })
  },
  onToggle6: function () {
    this.setData({
      item_isExpanded6: !this.data.item_isExpanded6
    })
  },
  onToggle7: function () {
    this.setData({
      item_isExpanded7: !this.data.item_isExpanded7
    })
  },
  contactTab: function () {
    wx.makePhoneCall({
      phoneNumber: '02026099062',
    })
  }
}) 