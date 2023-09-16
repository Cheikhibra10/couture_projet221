<?php

namespace App\Controllers;

use App\Core\Session;
use App\Core\Validator;
use App\Core\Controller;
use App\Models\Categorie;
use App\Models\ArticleConfection;
use App\Models\ArticleVente;

class ArticleVenteController extends Controller
{
      /**
       * lister Categorie
       *
       * @return mixed
       */
      public function index()
      {
            $datas = ArticleVente::all();
            // dd($datas);
            $this->view('vente/liste', ["datas" => $datas]);
      }
      /**
       * charger le Formulaire de Categorie
       *
       * @return mixed
       */
      public function create()
      {
            // $datas = Categorie::all();
            // dd($datas);
            ob_start();
            require "../public/ressources/views/vente/add.html.php";
            $content_for_view = ob_get_clean();
            require "../public/ressources/views/base.layout.html.php";
      }

      /**
       * Ajouter une  Categorie en BD apres 
       * soummition du formulaire
       *
       * @return mixed
       */
      public function store()
      {
            dd($_POST);
            Validator::isVide($_POST["libelle"], "libelle");
            Validator::isNumeric($_POST["prixVente"], "prixVente");
            // Validator::isNumeric($_POST["qteStock"],"qteStock");
            if (Validator::validate()) {
                  try {
                        ArticleVente::create([
                              "libelle" => $_POST["libelle"],
                              "prixVente" => $_POST["prixVente"],
                              "quantite" => $_POST["quantite"],
                              "categorieId" => $_POST["categorieId"],
                        ]);
                  } catch (\PDOException $th) {
                        Validator::$errors['libelle'] = "le libelle existe deja";

                  }
                  $this->redirect("article");
            } else {
                  Session::set("errors", Validator::$errors);
                  $this->redirect("article_add");
            }
      }
}
