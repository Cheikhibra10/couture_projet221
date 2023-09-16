<?php

namespace App\Controllers;

use App\Core\Session;
use App\Core\Validator;
use App\Core\Controller;
use App\Models\Categorie;

class CategorieController extends Controller
{
  /**
   * lister Categorie
   *
   * @return mixed
   */
  public function index()
  {
    $filteredCategories = Categorie::findEtat(1);

    dd($filteredCategories);
    $this->view('categorie/liste', ["datas" => $filteredCategories]);
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
    // $datas = Categorie::all();
    // dd($datas);
    $this->view("categorie/liste");
  }

  /**
   * Ajouter une  Categorie en BD apres 
   * soummition du formulaire
   *
   * @return mixed
   */
  public function store()
  {
    Validator::isVide($_POST["libelle"], "libelle");
    if (Validator::validate()) {
      try {
        Categorie::create([
          "libelle" => $_POST["libelle"]
        ]);
      } catch (\PDOException $th) {
        Validator::$errors['libelle'] = "le libelle existe deja";
        // die($th->getMessage());
      }
    }
    Session::set("errors", Validator::$errors);
    $this->redirect("categorie");
  }
}
