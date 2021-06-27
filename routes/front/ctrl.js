const axios = require("axios")
const dateFormat = require("dateformat");

exports.get = async (req, res, next) => {
  

  //pagnation option 설정
  const page = req.query.page || 1;
  const pagingSize = 3;
  const index_unit = 10

  // Post data 수집
  var url = process.env.API_ROOT + "/post/read/"
  const contents = await axios({
    method: "get",
    url,
    params: {
      page,
      pagingSize
    }
  })

  // Pagenation위한 작업 : 총 포스팅 갯수 수집하기
  var url = process.env.API_ROOT + "/post/count/"
  const result = await axios({method: "get",url,})

  const total = result.data.total
  const totalPage = Math.ceil(total/pagingSize)
  const index_current = Math.floor((page-1)/index_unit)
  const index_start_page = (index_current)*index_unit +1
  const index_end_page = (index_current+1)*index_unit>totalPage ? totalPage :(index_current+1)*index_unit
  const i_prev = page == 1 ? 0 : 1
  const i_next = page == totalPage ? 0 : 1


  const pagenation = {
    currentPage: parseInt(page),
    index_start_page,
    index_end_page, 
    i_next,
    i_prev
  }


  // 날짜포맷
  contents.data.map(item => {
    item.updatedAt = dateFormat(Date.parse(item.updatedAt), "fullDate")
    item.createdAt = dateFormat(Date.parse(item.createdAt), "fullDate")
  })

  res.render("index.html", {
    contents: contents.data,
    pagenation
  })
}