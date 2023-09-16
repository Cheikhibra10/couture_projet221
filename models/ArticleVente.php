<?php

namespace App\Models;

use App\Core\Model;
use App\Core\Database;
use App\Models\Categorie;
use App\Models\Fournisseur;

class ArticleVente extends Model
{
    public int $id;
    public string $libelle;
    public int $prixVente;
    public int $quantite;
    public string|null $photo;
    public string|null $reference;
    protected static function tableName()
    {
        return "articlevente";
    }
    //Cle etrangere
    public int $idCategorie;
    private  Categorie $categorieModel;

    public function __construct()
    {
        $this->categorieModel = new Categorie();
    }

    //Navigabite   ManyToOne
    public function categorie()
    {
        return  $this->categorieModel->find($this->idCategorie);
    }
  
    /**
     * Get the value of id
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
    public function getLibelle()
    {
        return $this->libelle;
    }

    /**
     * Set the value of libelle
     *
     * @return  self
     */
    public function setLibelle($libelle)
    {
        $this->libelle = $libelle;

        return $this;
    }

    /**
     * Get the value of prix
     */
    public function getPrix()
    {
        return $this->prixVente;
    }

    /**
     * Set the value of prix
     *
     * @return  self
     */
    public function setPrix($prix)
    {
        $this->prixVente = $prix;

        return $this;
    }

    /**
     * Get the value of qteStock
     */
    public function getQteStock()
    {
        return $this->quantite;
    }

    /**
     * Set the value of qteStock
     *
     * @return  self
     */
    public function setQteStock($qteStock)
    {
        $this->quantite = $qteStock;

        return $this;
    }

    /**
     * Get the value of photo
     */
    public function getPhoto()
    {
        return $this->photo;
    }

    /**
     * Set the value of photo
     *
     * @return  self
     */
    public function setPhoto($photo)
    {
        $this->photo = $photo;

        return $this;
    }

   
    public function getReference()
    {
        return $this->reference;
    }

    /**
     * Set the value of photo
     *
     * @return  self
     */
    public function setReference($reference)
    {
        $this->reference = $reference;

        return $this;
    }


    public static function pagination($page, $itemsPerPage)
    {
        $offset = ($page - 1) * $itemsPerPage;

        // Open database connection using Database class
        $pdo = Database::openConnexion();

        $query = "SELECT * FROM articleconfection LIMIT :limit OFFSET :offset";
        $statement = $pdo->prepare($query);
        $statement->bindValue(':limit', $itemsPerPage, \PDO::PARAM_INT);
        $statement->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $statement->execute();

        $paginatedData = $statement->fetchAll(\PDO::FETCH_ASSOC);

        // Close the database connection
        Database::closeConnexion();

        return $paginatedData;
    }
}
