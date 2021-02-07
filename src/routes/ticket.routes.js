/*
    Path: ticket
*/
const {request, response, query} = require('express');
const { Router } = require('express');
const pool = require('../database/database.conection');
const router = Router();


//obtener ticket
router.get('/:id', async(req = request, res = response) => {

    params = req.params

    const response  = await pool.query(`
        SELECT * 
        FROM tb_fd_valedespacho
        NATURAL JOIN tb_fd_vehiculo 
        NATURAL JOIN tb_fd_conductor
        NATURAL JOIN tb_fd_combustible
        WHERE tb_valedespacho_id = ` + params['id']
    );

    console.log(response.rows[0]);

    if (response.rowCount > 0){

        let ticket = response.rows[0];
        res.status(200).json({
            "ok": true,
            "ticket": {
                "id": params['id'],
                "serie": ticket['tb_valedespacho_numser'],
                "emitionDate": ticket['tb_valedespacho_fechoremi'],
                "reference": ticket['tb_valedespacho_ref'],
                "conductor": ticket['tb_conductor_apenom'],
                "combusiteble": ticket['tb_combustible_nom'],
                "unity" : ticket['tb_combustible_unimed'],
                "placa": ticket['tb_vehiculo_numpla'],
                "model": ticket['tb_vehiculo_mar'],
                "carga": ticket['tb_vehiculo_car'],
                "type": ticket['tb_vehiculo_tip'],
                "quantity": ticket['tb_valedespacho_can'],
            }
        })
    } else {
        res.status(400).json({
            "ok": false,
            "message": "Ticket no encontrado"
        });
    }
});

module.exports = router;