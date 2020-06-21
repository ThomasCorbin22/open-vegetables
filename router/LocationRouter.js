const express = require('express');

class LocationRouter {
    constructor(locationService) {
        this.locationService = locationService
        this.router = express.Router()
    }

    route() {        
        // Deals with individual areas
        this.router.get('/area/list/', this.listAreas.bind(this));
        this.router.get('/area/:id', this.getArea.bind(this));
        this.router.post('/area/', this.postArea.bind(this));
        this.router.put('/area/:id', this.putArea.bind(this));
        this.router.delete('/area/:id', this.deleteArea.bind(this));

        // Deals with user liked districts
        this.router.get('/district/list/all', this.listAllDistricts.bind(this));
        this.router.get('/district/list/:id', this.listDistricts.bind(this));
        this.router.get('/district/:id', this.getDistrict.bind(this));
        this.router.post('/district/', this.postDistrict.bind(this));
        this.router.put('/district/:id', this.putDistrict.bind(this));
        this.router.delete('/district/:id', this.deleteDistrict.bind(this));
        
        // Deals with map pages
        this.router.get('/map', this.displayMap.bind(this));
        this.router.get('/map/:area/:district', this.displayLocation.bind(this));

        return this.router
    }

    // List out all the areas
    listAreas(req, res) {
        return this.locationService.listAreas()
            .then((areas) => {
                res.send(areas)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Get a specific area
    getArea(req, res) {
        let id = req.params.id

        return this.locationService.getArea(id)
            .then((area) => {
                res.send(area)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Post an area
    postArea(req, res) {
        let area = {
            area: req.body.area
        }

        return this.locationService.addArea(area)
            .then((area) => {
                res.send(area)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Update an area
    putArea(req, res) {
        let id = req.params.id

        let area = {
            area: req.body.area
        }

        return this.locationService.updateArea(area, id)
            .then((area) => {
                res.send(area)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Delete an area
    deleteArea(req, res) {
        let id = req.params.id

        return this.locationService.deleteArea(id)
            .then((area) => {
                res.send(area)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deals with districts

    // Gets all districts
    listAllDistricts(req, res) {
        return this.locationService.listAllDistricts()
            .then((districts) => {
                res.send(districts)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Gets an area's districts
    listDistricts(req, res) {
        let area_id = req.params.id

        return this.locationService.listDistricts(area_id)
            .then((districts) => {
                res.send(districts)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Gets a district
    getDistrict(req, res) {
        let id = req.params.id

        return this.locationService.getDistrict(id)
            .then((district) => {
                res.send(district)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    // Adds a district
    postDistrict(req, res) {
        let district = {
            district: req.body.district,
            area_id: req.body.area_id
        }

        return this.locationService.addDistrict(district)
            .then((district) => {
                res.send(district)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Updates a district
    putDistrict(req, res) {
        let id = req.params.id

        let district = {
            district: req.body.district,
            area_id: req.body.area_id
        }

        return this.locationService.updateDistrict(district, id)
            .then((district) => {
                res.send(district)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Deletes a district
    deleteDistrict(req, res) {
        let id = req.params.id

        return this.locationService.deleteDistrict(id)
            .then((district) => {
                res.send(district)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    

    // Displays the map
    displayMap(req, res) {
        res.render('map', { title: 'map' })
    }

    // Displays the location
    displayLocation(req, res) {
        res.render('map', { title: req.params.district, location: req.params.district })
    }
}

module.exports = LocationRouter