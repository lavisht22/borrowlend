# borrowlend

## Synopsis

'borrowlend' is an API project that facilitates transactions between one lender and multiple borrowers. Borrowers can create their account and start making credit requests within their limit. Lender can view the requests and mark them once the repayment is done.

## END POINTS

* USERS
    POST /users/login
    POST /users/signup

* LENDERS
    * PUT /api/lender/payment
    * GET /api/lender/viewrequests
    * GET /api/lender/viewborrowers

* BORROWERS
    GET /api/borrower/viewrequests
    POST /api/borrower/createrequest

## Routes Explanation

The 'Users' routes lets users sign-up and login to the API. Once a user is logged in, he/she is given a JWT token which has to be included in the Authorization header of all the upcoming requests.

The 'Lender' routes facilitate lenders and let them view all the requests and borrowers in the system. Moreover they can also mark the payments as done. To access Lender routes, a proper JWT token must be included in the request.

'Borrower' routes facilitate borrowers and let them make requests and view the requests they've previously made. To access Borrower routes, a proper JWT token must be included in the request Authorization header.

## Installation
```
git clone https://github.com/lavisht22/borrowlend.git
npm install
npm start
```

## API Reference

API Reference: https://documenter.getpostman.com/view/2443435/collection/6thzgUH

## Contributors

Lavish Thakkar (lavisht22)

## License

Not Applicable
