<?php

namespace App\Controllers\Api;

use App\Core\Session;
use App\Models\Unite;
use App\Core\Validator;
use App\Core\Controller;
use App\Models\Categorie;
use App\Models\UniteCategorie;

class UniteController extends Controller
{
    /**
     * lister Categorie
     *
     * @return mixed
     */
    public function index()
    {
        $this->JsonEncode(Unite::all());
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
        $extractedValues = $data['extractedValues'];
        Validator::isVide($data["libelle"], "idCategorie");
        if (Validator::validate()) {
            // dd('ok');
            try {
                foreach ($extractedValues  as $value) {
                    $unite = Unite::create([
                        "unite_libelle" => $value["unite"],
                    ]);

                    UniteCategorie::create([
                        'idCategorie' => $data["libelle"],
                        "idUnite" => $unite->id,
                        "libelle" => $value["unite"],
                        "conversion" => $value["convertion"]
                    ]);
                }
            } catch (\PDOException $th) {
                // Validator::$errors['libelle'] = "le libelle existe deja";
                // die($th->getMessage());
            }
        }
    }
}
