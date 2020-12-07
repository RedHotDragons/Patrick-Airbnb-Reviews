# Airbnb CRUD Guideline

* **GET**

  * **URL**

  `/api/reviews/:id`

  * **SAMPLE**

  `axios.get('/api/reviews/${this.props.listingId}')`

  * **SUCCESS CODE**

  `200`

  * **ERROR CODE**

  `404`

  * **EXAMPLE CONTENT**
  `{
        "_id" : ObjectId("5fc7f92f16abf620a41db031"),
        "__v" : 0,
        "listing_id" : 1,
        "date" : ISODate("2020-04-24T01:02:53.832Z"),
        "reviewer_name" : "Frank Douglas",
        "reviewer_picture" : "https://duysfaces.s3-us-west-1.amazonaws.com/Female/014f.jpg",
        "comments" : "Distinctio blanditiis temporibus exercitationem rerum enim doloremque est repudiandae minima. Dolor corrupti ut assumenda in unde perspiciatis. Provident aspernatur quas incidunt sequi provident optio. Nisi in ut et voluptas est eligendi velit. Doloribus quia perspiciatis voluptatibus ut distinctio veritatis.",
        "cleanliness" : 1,
        "communication" : 5,
        "check_in" : 1,
        "accuracy" : 3,
        "location" : 1,
        "value" : 2
}`

* **DELETE**

  * **URL**

  `/api/deleteReviews/:id`

  * **SAMPLE**

  `axios({
      method: 'delete',
      url: '/api/deleteReviews/${this.props.listingId}',
      data: {
        cleanliness: {$gt: 3}
      }
    })`

  * **SUCCESS CODE**

  `200`

  * **SUCCESS RESPONSE**

  `successfully deleted data`

  * **ERROR CODE**

  `404`

* **POST**

  * **URL**

  `/api/addReviews/:id`

  * **SAMPLE**

  ` axios.post('/api/addReviews/${this.props.listingId}', {
      "listing_id" : 1,
      "date" : "August 2030",
      "reviewer_name" : "Patrick Ng",
      "reviewer_picture" : "https://duysfaces.s3-us-west-1.amazonaws.com/Female/061f.jpg",
      "comments" : "hi im a test, ignore me plz.",
      "cleanliness" : 1,
      "communication" : 1,
      "check_in" : 1,
      "accuracy" : 1,
      "location" : 1,
      "value" : 1
  })
  .then((response) => console.log(response))
  .catch((err) => console.log(err))`

  * **SUCCESS CODE**

  `200`

  * **SUCCESS RESPONSE**

  `successfully added data`

  * **ERROR CODE**

  `404`

