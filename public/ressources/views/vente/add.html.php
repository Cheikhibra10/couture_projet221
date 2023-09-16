<style>
        .success-messagee {
                color: green;
        }

        .error-messagee {
                color: red;
        }
</style>
<div class="container mt-18 col-md-8">
        <div class="card mt-4">
                <div class="card-body bg-white">
                        <h4 class="card-title text-center"> Ajouter des Articles Ventes </h4>
                        <form class="row gx-3 gy-3" novalidate id="addForm">
                                <div class="col-md-6 position-relative formC">
                                        <label for="validationTooltip01" class="form-label">Libelle</label>
                                        <input type="text" name="libelle" class="form-control" id="libelle" value="">
                                        <div id="feedbackMessage"></div>
                                        <small class="error-message">Error message</small>
                                </div>
                                <div class="col-md-6 position-relative formCa">
                                        <label for="validationTooltip04" class="form-label">Taille</label>
                                        <select class="form-select" id="tailleSelect" name="idCategorie">
                                                <option selected disabled value="">Selectionnez une taille</option>
                                        </select>
                                        <small class="error-message">Error message</small>
                                </div>
                                <div id="checkboxContainer" class="check"></div>
                                <a href="#" class="clickable-icon" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        <span class="material-symbols-outlined plust">
                                                add_circle
                                        </span>
                                </a>

                                <div class="col-md-6 position-relative formCa">
                                        <label for="validationTooltip04" class="form-label">Categorie</label>
                                        <select class="form-select" id="categorieSelect1" name="idCategorie">
                                                <option selected disabled value="">Selectionnez une categorie</option>
                                        </select>
                                        <small class="error-message">Error message</small>
                                </div>
                                <div id="checkboxContainer" class="check"></div>
                                <div class="image1">
                                        <label for="" class="form-label">Photo
                                                <input type="file" id="image" style="display:none;">
                                                <label for="image">
                                                        <img id="photo" src="<?= AssetImg("no_image.jpg
              ") ?>">
                                                </label>
                                        </label>
                                </div>

                                <div class="col-md-6 position-absolute formC article">
                                        <label for="validationTooltip03" class="form-label text-md fs-5">Articles Confection</label>
                                </div>
                                <a href="#" class="clickable-icon3" id="addArticle">
                                        <span class="material-symbols-outlined plusa">
                                                add_circle
                                        </span>
                                </a>
                                <table class="table table-dark table1 col-md-2">
                                        <thead>
                                                <tr>
                                                        <th scope="col">Libelle</th>
                                                        <th scope="col">Quantite</th>
                                                </tr>
                                        </thead>
                                        <tbody id="categoryTableBody">

                                        </tbody>
                                </table>
                                <div class="col-md-2 position-relative formC prixVente">
                                        <label for="validationTooltip02" class="form-label">Prix Vente</label>
                                        <input type="text" class="form-control" id="prixVente" value="" disabled>
                                        <small class="error-message">Error message</small>
                                </div>

                                <div class="col-md-2 position-relative formC marge">
                                        <label for="validationTooltip02" class="form-label">Marge</label>
                                        <input type="text" name="marge" class="form-control" id="marge" value="">
                                        <small class="error-message">Error message</small>
                                </div>

                                <div class="col-md-2 position-relative formC cProduction">
                                        <label for="validationTooltip02" class="form-label">Cout Production</label>
                                        <input type="text" class="form-control" id="cProduction" value="0" disabled>
                                        <small class="error-message">Error message</small>
                                </div>
                                <div class="col-md-2 position-relative formC">
                                        <label for="validationTooltip02" class="form-label">Reference</label>
                                        <input type="text" class="form-control" id="reference" disabled>
                                        <small class="error-message">Error message</small>
                                </div>
                                <div class="col-12">
                                        <button class="btn btn3 btn-dark" type="submit" id="submit">Submit form</button>
                                </div>

                        </form>
                </div>
        </div>
        <div class="card mt-5">
                <div class="card-body bg-light">
                        <h4 class="card-title">Liste des Articles </h4>
                        <div class="table-responsive">
                                <table class="table table-dark col-md-14">
                                        <thead>
                                                <tr>
                                                        <th scope="col" class="text-center align-middle">ID</th>
                                                        <th scope="col" class="text-center align-middle">Libelle</th>
                                                        <th scope="col" class="text-center align-middle">Prix</th>
                                                        <th scope="col" class="text-center align-middle">Quantite</th>
                                                        <th scope="col" class="text-center align-middle">Image</th>
                                                        <th scope="col" class="text-center align-middle">Actions</th>
                                                </tr>
                                        </thead>
                                        <tbody id="categoryTableBody">
                                        </tbody>
                                </table>
                        </div>
                        <div id="paginationContainer" class="pagination-container">
                                <ul class="pagination justify-content-center">
                                        <!-- Pagination links will be inserted here -->
                                </ul>
                        </div>
                </div>
        </div>
</div>

<!-- Taille Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
                <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Ajouter une taille</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                                <div class="modal-body">
                                        <div class="mb-3">
                                                <label for="libelle" class="form-label">Libelle</label>
                                                <input type="text" class="form-control" id="libellet">
                                        </div>
                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                        <button type="submit" id="submitBtnTaille" class="btn btn-primary">Enregistrer</button>
                                </div>
                        </form>
                </div>
        </div>
</div>


<!--Unite-->
<div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
                <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Ajouter une unite</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                                <div class="modal-body">
                                        <div class="mb-3">
                                                <label for="libelle" class="form-label">Libelle</label>
                                                <input type="text" class="form-control" id="libelle2" disabled>
                                        </div>
                                        <div class=" mb-3">
                                                <label for="libelle" class="form-label">Unite par defaut</label>
                                                <input type="text" class="form-control" id="unitedefaute" disabled>
                                        </div>
                                        <div class="col-md-8 mb-3">
                                                <label for="libelle" class="form-label">Unite</label>
                                                <input type="text" class="form-control" id="unitedefaut2">
                                        </div>
                                        <div class="col-md-1 mb-3 position-absolute conversion">
                                                <label for="libelle" class="form-label">Conversion</label>
                                                <input type="text" class="form-control" id="conversion" value="1">
                                        </div>
                                        <div class="plusU">
                                                <button class="btn btn-dark hoverable" id="okButton">OK</button>
                                        </div>
                                        <table class="table" id="cartTable">
                                                <thead>
                                                        <tr>
                                                                <th scope="col">Unite par defaut </th>
                                                                <th scope="col">Conversion</th>
                                                                <th scope="col">Action</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                        </table>
                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                        <button type="submit" id="submitBtne" class="btn btn-primary">Enregistrer</button>
                                </div>
                        </form>
                </div>
        </div>
</div>
<script type="module" src="<?= AssetJs("/vente/script.js") ?>">
</script>