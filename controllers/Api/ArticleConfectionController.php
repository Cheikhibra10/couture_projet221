<?php

namespace App\Controllers\Api;

use App\Core\Session;
use App\Core\Validator;
use App\Core\Controller;
use App\Core\Pagination;
use App\Models\ArticleConfection;


class ArticleConfectionController extends Controller
{
    /**
     * lister Categorie
     *b
     * @return mixed
     */
    public function index()
 {
  $datas = ArticleConfection::all();
  $this->JsonEncode($datas);
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
        $requestData = json_decode(file_get_contents("php://input"), true);

        // Process other form data
        $libelle = $requestData['libelle2'];
        $prixAchat = $requestData['prix'];
        $idCategorie = $requestData['categorieSelect'];
        // ... other fields

        // Handle base64 image data
        $imageData = $requestData['image']; // The image data is already in base64 format

        // Insert data into the database
        try {
            ArticleConfection::create([
                "libelle" => $libelle,
                "qteStock" => $requestData["quantite"],
                "prixAchat" => $prixAchat,
                "reference" => $requestData["reference"],
                "idCategorie" => $idCategorie,
                "idFournisseur" => $requestData["fournisseur"],
                "photo" => $imageData // Store the base64 image data in the database
            ]);
            

            // Send JSON response
            $response = ['success' => true];
            echo json_encode($response);
        } catch (\PDOException $th) {
            // Handle database errors
            http_response_code(500);
            $response = ['success' => false, 'error' => 'Database error'];
            echo json_encode($response);
        }
    }
}
