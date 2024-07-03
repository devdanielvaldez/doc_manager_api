const dashboardReport = async(req, res) => {
    try {
        res.status(200).json({
            ok: true,
            metrics: 0
        })
    } catch(err) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado",
            error: err
        })
    }
}