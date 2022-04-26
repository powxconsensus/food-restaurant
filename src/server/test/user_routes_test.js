const sinon = require('sinon')
const chai = require('chai')
const express = require('express')
const { deleteMe, updateMe } = require('../controllers/userController')
res = { code: 200, status: "OK" }
const assert = chai.assert
const expect = chai.expect

describe("userModels test", function () {
    it("deleteMe", function () {

        req = {
            user: {
                cart: null,
                id: "test_id",
            },
            status: sinon.spy()
        }
        ret = deleteMe(req)


        assert(req.status)
        assert(ret != false)

    });

    it("updateMe", function () {
        req = {
            user: {
                firstName: "fname1"
            }
        }


        changs = {
            firstName: req.user.firstName
        }


        chnges = updateMe(req, res)

        assert(changs.firstName == "fname1")
        assert(chnges != false)

    })
})