<?php

namespace App\Models;

use App\Core\Model;
use App\Models\Unite;
use App\Models\Categorie;

class UniteCategorie extends Model
{
    public  int $id;
    public int $idCategorie;
    public int $idUnite;


    protected static function tableName()
    {
        return "unitecategorie";
    }

    //Many-to-One relationship
    public Categorie $categorieModel;
    public Unite $uniteModel;

    public function __construct()
    {
        
        $this->categorieModel = new Categorie();
        $this->uniteModel = new Unite();
    }


    public  function categorie()
    {
        return $this->categorieModel->find($this->idCategorie);
    }

    public function unite()
    {
        return $this->uniteModel->find($this->idUnite);
    }

    public static function findDetailByAppro($idCategorie)
    {
        return parent::query("select * from " .  self::tableName() . " where idCategorie=:idCategorie  ", ["idCategorie" => $idCategorie]);
    }


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
}
