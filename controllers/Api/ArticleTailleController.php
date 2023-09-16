<?php

namespace App\Controllers\Api;

use App\Core\Validator;
use App\Core\Controller;
use App\Models\UniteCategorie;

class ArticleTailleController extends Controller
{
     /**
      * ArticleConfection
      *
      * @return mixed
      */
     public function index()
     {
          $datas = UniteCategorie::all();
          $this->JsonEncode($datas);
     }
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
     }
}
