const sinon = require('sinon')
const chai = require('chai')
const express = require('express')
const { createOrder, rejectOrAcceptOrder } = require('../controllers/orderController')
res = { code: 200, status: "OK" }
const assert = chai.assert
const jest = require("jest")

describe("userModels test", function () {
    it("reject_or_accept", function () {

        resobj = jest.fn
        req = {
            user: {
                cart: null,
                id: "test_id",
            },
            status: sinon.spy()
        }


        ret = rejectOrAcceptOrder(req)
        reqbody = {
            pricePerQuantity: 20,
            totalAmount: 60,
            quantity: 3,
            foodItemId: "test",
        }

        assert(reqbody.pricePerQuantity * reqbody.quantity == reqbody.totalAmount)

        assert(req.status)
        assert(ret != false)

    });

    it("createOrder", function () {
        req = {
            user: {
                firstName: "fname1"
            }
        }

        changs = {
            firstName: req.user.firstName
        }

        chnges = createOrder(req, res)

        assert(changs.firstName == "fname1")
        assert(chnges != false)

    })
})