const sinon = require('sinon')
const { createCartIfNotExist, getCartItems } = require("../controllers/cartController")
const chai = require('chai')
const express = require('express')
const request = require("supertest")
res = { code: 200, status: "OK" }
const assert = chai.assert

describe("cartController test", function () {
    it("createCartIfNotExists", function () {
        Cart = sinon.spy(createCartIfNotExist)

        req = {
            user: {
                cart: null,
                id: "test_id",
                save: sinon.spy()
            }
        }

        ret = createCartIfNotExist(req)

        assert(req.user.save)
        assert(ret != false)

    });

    it("clearCart", function () {
        req = {
            user: {
                cart: {
                    create() { return true }
                }
            }
        }

        ret = getCartItems(req, res)

        assert(ret != false)

    })
})