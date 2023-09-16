<?php

use App\Core\Router;
use App\Controllers\Api\UniteController;
use App\Controllers\Api\CategorieController;
use App\Controllers\Api\FournisseurController;
use App\Controllers\Api\ArticleVenteController;
use App\Controllers\Api\UniteCategorieController;
use App\Controllers\Api\ArticleConfectionController;
use App\Controllers\Api\ArticleTailleController;
use App\Controllers\Api\TailleController;

Router::route("/api/categorieadd", [CategorieController::class, 'store']);
Router::route("/api/categorie-getUnite", [CategorieController::class, 'getUnite']);
Router::route("/api/UniteByCategorie", [CategorieController::class, 'getUniteCategorie']);
Router::route("/api/categorie", [CategorieController::class, 'index']);
Router::route("/api/categorie1", [CategorieController::class, 'index1']);
Router::route("/api/unite_add", [UniteController::class, 'store']);
Router::route("/api/unite", [UniteController::class, 'index']);
Router::route("/api/fournisseur_add", [FournisseurController::class, 'store']);
Router::route("/api/fournisseur", [FournisseurController::class, 'index']);
Router::route("/api/articlevente-getData", [ArticleVenteController::class, 'index']);
Router::route("/api/articlevente_add", [ArticleVenteController::class, 'store']);
Router::route("/api/article", [ArticleConfectionController::class, 'index']);
Router::route("/api/store-article", [ArticleConfectionController::class, 'store']);
Router::route("/api/store-vente", [ArticleVenteController::class, 'store']);
Router::route("/api/store-articletaille", [ArticleTailleController::class, 'store']);
Router::route("/api/unitecategorie", [UniteCategorieController::class, 'index']);
Router::route("/api/taille_add", [TailleController::class, 'store']);
Router::route("/api/taille", [TailleController::class, 'index']);