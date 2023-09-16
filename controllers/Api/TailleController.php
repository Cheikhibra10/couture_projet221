<?php

namespace App\Controllers\Api;

use App\Core\Session;
use App\Models\Unite;
use App\Core\Validator;
use App\Core\Controller;
use App\Models\Categorie;
use App\Models\Taille;
use App\Models\UniteCategorie;

class TailleController extends Controller
{
    /**
     * lister Categorie
     *
     * @return mixed
     */
    public function index()
    {
        $this->JsonEncode(Taille::all());
    }





    // Instanciez le contrôleur


    // Traitez la requête pour obtenir les données JSON

    /**
     * charger le Formulaire de Categorie
     *
     * @return mixed
     */
    public function create()
    {
    }

    /**
     * Ajouter une  Categorie en BD apres 
     * soummition du formulaire
     *
     * @return mixed
     */
    public function store()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        Validator::isVide($data["libellet"], "libelle");
        // dd('ok');
        if (Validator::validate()) {
            try {
                 Taille::create([
                    "libelle" => $data["libellet"]
                ]);
            } catch (\PDOException $th) {
                Validator::$errors['libelle'] = "le libelle existe deja";
                // die($th->getMessage());
            }
        }
    }
}
