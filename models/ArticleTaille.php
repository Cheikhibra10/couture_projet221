<?php

namespace App\Models;

use App\Core\Model;
use App\Models\Unite;
use App\Models\Taille;
use App\Models\Categorie;
use App\Models\ArticleVente;

class ArticleTaille extends Model
{
 public  int $id;
    public int $marge;
    public int $cout_production;
 public int $idArticlevente;
 public int $idTaille;


 protected static function tableName()
 {
  return "articlevente_taille";
 }

 //Many-to-One relationship
 public ArticleVente $articleventeModel;
 public Taille $tailleModel;

 public function __construct()
 {

  $this->articleventeModel = new ArticleVente();
  $this->tailleModel = new Taille();
 }


 public  function articlevente()
 {
  return $this->articleventeModel->find($this->idArticlevente);
 }

 public function taille()
 {
  return $this->tailleModel->find($this->idTaille);
 }

 // public static function findDetailByAppro($idCategorie)
 // {
 //     return parent::query("select * from " .  self::tableName() . " where idCategorie=:idCategorie  ", ["idCategorie" => $idCategorie]);
 // }


 /**
  * Set the value of id
  *
  * @return  self
  */
 public function getId()
 {
  return $this->id;
 }

 /**
  * Set the value of id
  *
  * @return  self
  */
 public function setId($id)
 {
  $this->id = $id;

  return $this;
 }

 /**
  * Get the value of libelle
  */
 // public function getQteAppro()
 // {
 //     return $this->qteAppro;
 // }

 /**
  * Set the value of libelle
  *
  * @return  self
  */


 /**
  * Get the value of prix
  */
 // public function getArticleConfId()
 // {
 //     return $this->categoConfId;
 // }

 /**
  * Set the value of prix
  *
  * @return  self
  */


 /**
  * Get the value of qteStock
  */
  public function getPrix()
  {
      return $this->marge;
  }

  /**
   * Set the value of prix
   *
   * @return  self
   */
  public function setPrix($prix)
  {
      $this->marge = $prix;

      return $this;
  }

  /**
   * Get the value of qteStock
   */
  public function getQteStock()
  {
      return $this->cout_production;
  }

  /**
   * Set the value of qteStock
   *
   * @return  self
   */
  public function setQteStock($qteStock)
  {
      $this->cout_production = $qteStock;

      return $this;
  }

}
