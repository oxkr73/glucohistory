db.usuarios.aggregate([
{$match:{
    email:"oscar1@oxkr.es"
    }},
{$project:{
    timeRange:{
        $filter:{
            input:"$glucoData",
            as:"date",
            cond: {
                $lt:["$$date.time",ISODate("2018-01-01")]
                }
            }
        }
    }}
])