const axios = require("axios")
const dateFormat = require("dateformat");

exports.fn_pagenation = async (page_option) => {

  // @ options: page / pagingSize / index_unit / dataURL / countURL
  // @ page : defaultvalue -> 1
  // @ pagingSize : defaultvalue -> 20
  // @ index_unit : defaultvalue -> 10
  // @ dataURL(required) : URL
  // @ countURL(required) : URL
  const req = page_option.req;
  const page = req.query.page || 1;
  const pagingSize = page_option.pagingSize || 20;
  const index_unit = page_option.index_unit || 10;
  const dataURL = page_option.dataURL;
  const countURL = page_option.countURL;

  var contents = await axios({
    method: "get",
    url: dataURL,
    params: {
      page,
      pagingSize
    }
  })

  const count = await axios({
    method: "get",
    url: countURL
  })

  const total = count.data.total
  const totalPage = Math.ceil(total / pagingSize)
  const index_current = Math.floor((page - 1) / index_unit)
  const index_start_page = (index_current) * index_unit + 1
  const index_end_page = (index_current + 1) * index_unit > totalPage ? totalPage : (index_current + 1) * index_unit
  const i_prev = page == 1 ? 0 : 1
  const i_next = page == totalPage ? 0 : 1
  const isblank = contents.data.length;
  const pagenation = {
    isblank,
    currentPage: parseInt(page),
    index_start_page,
    index_end_page,
    i_next,
    i_prev
  }

  return {
    pagenation,
    contents: contents.data
  }
}

exports.fn_dateFormat = (contents, date_format) => {
  // @content: must be an Array
  // @date_format: find more options ->(https://www.npmjs.com/package/dateformat)
  contents.map(item => {
    item.updatedAt = dateFormat(Date.parse(item.updatedAt), date_format)
    item.createdAt = dateFormat(Date.parse(item.createdAt), date_format)
  })
  return contents

}