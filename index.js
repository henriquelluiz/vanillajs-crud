    /**
     * CONSTANTES GLOBAIS
     */
    const sheetId = "07d780a214a7";
    const sheetIdSpanElement = document.getElementById('sheetId');
    const segmentOptions = new Set([]);
    const guaranteeOptions = new Set([]);
    const additionalOptions = new Set([]);

    function showCreationTypeModal() {
        const modal = document.getElementById('creationTypeModal');
        const modalContent = document.getElementById('creationModalContent');
        const modalTitle = document.getElementById('creationModalTitle');

        modalTitle.textContent = "Cadastrar Contrato"
        modal.classList.remove('hidden');
        openModal(50, modalContent)
    }

    function showActionTypeModal(guarantee, type, id) {
        const modal = document.getElementById('actionTypeModal');
        const modalContent = document.getElementById('actionModalContent');
        const modalTitle = document.getElementById('actionModalTitle');

        // FORMULÁRIO
        const actionIdInput = document.getElementById("actionIdInput");
        const actionDateInput = document.getElementById("actionDateInput");
        const actionCNumberInput = document.getElementById("actionCNumberInput");
        const actionIssuerInput = document.getElementById("actionIssuerInput");
        const actionDocInput = document.getElementById("actionDocInput");
        const actionSegInput = document.getElementById("actionSegInput");
        const actionGuaranteeInput = document.getElementById("actionGuaranteeInput");
        const actionProdInput = document.getElementById("actionProdInput");
        const actionAmountInput = document.getElementById("actionAmountInput");
        const actionAddInput = document.getElementById("actionAddInput");
        const actionStatusInput = document.getElementById("actionStatusInput");
        const buttons = document.getElementById('actionModelButtons');


        if (type === 'edit') {

            modalTitle.textContent = 'Editar Contrato';
            handleInputFields(
                'edit',
                actionIdInput,
                actionDateInput,
                actionCNumberInput,
                actionIssuerInput,
                actionDocInput,
                actionSegInput,
                actionGuaranteeInput,
                actionProdInput,
                actionAmountInput,
                actionAddInput,
                actionStatusInput
            );

            buttons.innerHTML = `
                <button
                    type="button"
                    onClick="edit('${id}')"
                    class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Confirmar
                </button>
                <button
                    type="button"
                    onClick="closeModal('actionTypeModal', 'actionModalContent')"
                    class="bg-blue-100 text-blue-800 py-2 px-4 rounded hover:bg-blue-200">
                    Sair
                </button>
            `;  


        } else if (type === 'show') {
            if (
                String(guarantee).toLowerCase() === 'veiculo' ||
                String(guarantee).toLowerCase() === 'veículo'
            ) {
                modalTitle.textContent = 'Modal do Veículo';
            } else {
                modalTitle.textContent = 'Modal de Outras Garantias';
            }

            handleInputFields(
                'show',
                actionIdInput,
                actionDateInput,
                actionCNumberInput,
                actionIssuerInput,
                actionDocInput,
                actionSegInput,
                actionGuaranteeInput,
                actionProdInput,
                actionAmountInput,
                actionAddInput,
                actionStatusInput
            );

            buttons.innerHTML = `
                <button
                    type="button"
                    onClick="closeModal('actionTypeModal', 'actionModalContent')"
                    class="bg-rose-100 text-rose-800 py-2 px-4 rounded hover:bg-rose-200">
                    Sair
                </button>
            `;        
        
        } else {
            modalTitle.textContent = 'Remover Contrato';
            handleInputFields(
                'remove',
                actionIdInput,
                actionDateInput,
                actionCNumberInput,
                actionIssuerInput,
                actionDocInput,
                actionSegInput,
                actionGuaranteeInput,
                actionProdInput,
                actionAmountInput,
                actionAddInput,
                actionStatusInput
            );

            buttons.innerHTML = `
                <button
                    type="button"
                    onClick="remove('${id}')"
                    class="bg-rose-500 text-white py-2 px-4 rounded hover:bg-rose-700">
                    Confirmar
                </button>
                <button
                    type="button"
                    onClick="closeModal('actionTypeModal', 'actionModalContent')"
                    class="bg-rose-100 text-rose-800 py-2 px-4 rounded hover:bg-rose-200">
                    Sair
                </button>
            `;  

        }

        populateModal(
            id,
            actionIdInput,
            actionDateInput,
            actionCNumberInput,
            actionIssuerInput,
            actionDocInput,
            actionSegInput,
            actionGuaranteeInput,
            actionProdInput,
            actionAmountInput,
            actionAddInput,
            actionStatusInput
        );

        modal.classList.remove('hidden');
        openModal(300, modalContent);
    }

    function populateModal(
        contractId,
        actionIdInput,
        actionDateInput,
        actionCNumberInput,
        actionIssuerInput,
        actionDocInput,
        actionSegInput,
        actionGuaranteeInput,
        actionProdInput,
        actionAmountInput,
        actionAddInput,
        actionStatusInput
    ) {
        const contract = JSON.parse(localStorage.getItem(contractId));
        console.log("CONTRACT", contract);

        if (
            actionIdInput &&
            actionDateInput &&
            actionCNumberInput &&
            actionIssuerInput &&
            actionDocInput &&
            actionSegInput &&
            actionGuaranteeInput &&
            actionProdInput &&
            actionAmountInput &&
            actionAddInput &&
            actionStatusInput 
        ) {
            actionIdInput.value = contractId;
            actionDateInput.value = contract.date;
            actionCNumberInput.value = contract.contractNumber;
            actionIssuerInput.value = contract.issuer;
            actionDocInput.value = contract.doc;

            populateSelect(actionSegInput, segmentOptions, contract.segment);
            populateSelect(actionGuaranteeInput, guaranteeOptions, contract.guarantee);
            populateSelect(actionAddInput, additionalOptions, contract.additional);

            actionProdInput.value = contract.product;
            actionAmountInput.value = contract.amount;
            actionStatusInput.value = contract.status;

        }
    }

    function handleInputFields(type, ...inputs) {
        inputs.forEach((input) => {
            if (type === 'show' || type === 'remove') {
                input.disabled = true;
                input.classList.add("cursor-not-allowed");
            } else {
                input.disabled = false;
                input.classList.remove("cursor-not-allowed", "bg-gray-200");
            }
        })
    }

    function populateSelect(selectElement, optionsArray, selectedValue) {
        selectElement.innerHTML = '';

        optionsArray.forEach(optionValue => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.text = optionValue;
            selectElement.appendChild(option);
        });

        selectElement.value = selectedValue;
    }

    function openModal(duration, contentElement) {
        setTimeout(() => {
            contentElement.classList.remove('translate-x-full');
            contentElement.classList.add('translate-x-0');
            contentElement.classList.add('opacity-100');
            contentElement.classList.remove('opacity-0');
        }, duration);
    }

    function closeModal(modalId, contentId) {
        const modal = document.getElementById(modalId);
        const modalContent = document.getElementById(contentId);

        modalContent.classList.add('translate-x-full');
        modalContent.classList.remove('translate-x-0');

        setTimeout(() => {
            modalContent.classList.add('opacity-0');
            modalContent.classList.remove('opacity-100');
            modal.classList.add('hidden');
        }, 500);
    }

    function insertRow(
        id,
        date,
        contractNumber,
        issuer,
        doc,
        segment, 
        guarantee,
        product,
        amount,
        additional,
        status
    ) {
        const tContainer = document.getElementById("mainTableContainer");
        const tBody = document.getElementById("mainTable").querySelector("tbody");

        if (!tContainer.classList.contains("overflow-auto")) {
            tContainer.classList.add("overflow-auto")
        }

        const row = document.createElement("tr");
        row.dataset.id = id;
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${date}</td>
            <td class="px-6 py-4 whitespace-nowrap">${contractNumber}</td>
            <td class="px-6 py-4 whitespace-nowrap">${issuer}</td>
            <td class="px-6 py-4 whitespace-nowrap">${doc}</td>
            <td class="px-6 py-4 whitespace-nowrap">${segment}</td>
            <td class="px-6 py-4 whitespace-nowrap">${guarantee}</td>
            <td class="px-6 py-4 whitespace-nowrap">${product}</td>
            <td class="px-6 py-4 whitespace-nowrap">${amount}</td>
            <td class="px-6 py-4 whitespace-nowrap">${additional}</td>
            <td class="px-6 py-4 whitespace-nowrap">${status}</td>
            
            <!-- BUTTONS -->
            <td class="inline-flex items-center rounded-md px-6 py-4 whitespace-nowrap">
                <button
                    onclick="showActionTypeModal('${guarantee}', 'edit', '${id}')"
                    title="Editar um contrato"
                    class="text-yellow-700 hover:text-yellow-800 text-sm bg-yellow-50 hover:bg-yellow-300 border border-slate-300 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </span>
                    <span>Editar</span>
                </button>
                <button
                    onclick="showActionTypeModal('${guarantee}', 'show', '${id}')"
                    title="Vizualizar um contrato"
                    class="text-green-700 hover:text-green-800 text-sm bg-green-50 hover:bg-green-300 border-y border-slate-300 font-medium px-4 py-2 inline-flex space-x-1 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </span>
                    <span>Vizualizar</span>
                </button>
                <button
                    onclick="showActionTypeModal('${guarantee}', 'remove', '${id}')"
                    title="Apagar um contrato"
                    class="text-rose-700 hover:text-rose-800 text-sm bg-rose-50 hover:bg-rose-200 border border-slate-300 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </span>
                    <span>Deletar</span>
                </button>
            </td>
        `;

        tBody.appendChild(row);
    }

    function updateTableRow(contractId) {
        const contract = JSON.parse(localStorage.getItem(contractId));
        const row = document.querySelector(`[data-id="${contractId}"]`);

        if (row) {
            const cells = row.children;
            cells[1].textContent = contract.date;
            cells[2].textContent = contract.contractNumber;
            cells[3].textContent = contract.issuer;
            cells[4].textContent = contract.doc;
            cells[5].textContent = contract.segment;
            cells[6].textContent = contract.guarantee;
            cells[7].textContent = contract.product;
            cells[8].textContent = contract.amount;
            cells[9].textContent = contract.additional;
            cells[10].textContent = contract.status;
        }
    }

    function addToStorage(
        id,
        date,
        contractNumber,
        issuer,
        doc,
        segment, 
        guarantee,
        product,
        amount,
        additional,
        status
    ) {
        const values = JSON.stringify({
            date,
            contractNumber,
            issuer,
            doc,
            segment, 
            guarantee,
            product,
            amount,
            additional,
            status
        });

        localStorage.setItem(id, values);
    }

    function refreshTable() {
        const tBody = document.getElementById("mainTable").querySelector("tbody").innerHTML = '';
        for(let i = 0; i < localStorage.length; i++) {
            
            let key = localStorage.key(i);
            let valuesAsString = localStorage.getItem(key);
            let values = JSON.parse(valuesAsString);
            
            segmentOptions.add(values.segment);
            guaranteeOptions.add(values.guarantee);
            additionalOptions.add(values.additional);
            
            insertRow(
                key,
                values.date,
                values.contractNumber,
                values.issuer,
                values.doc,
                values.segment, 
                values.guarantee,
                values.product,
                values.amount,
                values.additional,
                values.status
            );
        }

        console.log(segmentOptions);
        console.log(guaranteeOptions);
        console.log(additionalOptions);

    }

    function save() {
        const form = document.getElementById("creationTypeForm");
        const submitter = document.getElementById("saveButton");
        const creationForm = new FormData(form, submitter);

        /**
         * creationDateInput
         * creationCNumberInput
         * creationIssuerInput
         * creationDocInput
         * creationSegInput
         * creationGuaranteeInput
         * creationProdInput
         * creationAmountInput
         * creationAddInput
         * creationStatusInput
         */

        const newId = crypto.randomUUID().slice(24);
        const dateValue = creationForm.get("creationDateInput")
        const contractNumberValue = creationForm.get("creationCNumberInput")
        const creationIssuerInput = creationForm.get("creationIssuerInput")
        const docValue = creationForm.get("creationDocInput")
        const segmentValue = creationForm.get("creationSegInput")
        const guaranteeValue = creationForm.get("creationGuaranteeInput")
        const productValue = creationForm.get("creationProdInput")
        const amountValue = creationForm.get("creationAmountInput")
        const additionalValue = creationForm.get("creationAddInput")
        const statusValue = creationForm.get("creationStatusInput")

        addToStorage(
            newId,
            dateValue,
            contractNumberValue,
            creationIssuerInput,
            docValue,
            segmentValue,
            guaranteeValue,
            productValue,
            amountValue,
            additionalValue,
            statusValue
        );

        segmentOptions.add(segmentValue);
        guaranteeOptions.add(guaranteeValue);
        additionalOptions.add(additionalValue);

        insertRow(
            newId,
            dateValue,
            contractNumberValue,
            creationIssuerInput,
            docValue,
            segmentValue,
            guaranteeValue,
            productValue,
            amountValue,
            additionalValue,
            statusValue
        );

        form.reset();
        closeModal("creationTypeModal", "creationModalContent");
    }

    function edit(contractId) {
        const actionDateInput = document.getElementById("actionDateInput");
        const actionCNumberInput = document.getElementById("actionCNumberInput");
        const actionIssuerInput = document.getElementById("actionIssuerInput");
        const actionDocInput = document.getElementById("actionDocInput");
        const actionSegInput = document.getElementById("actionSegInput");
        const actionGuaranteeInput = document.getElementById("actionGuaranteeInput");
        const actionProdInput = document.getElementById("actionProdInput");
        const actionAmountInput = document.getElementById("actionAmountInput");
        const actionAddInput = document.getElementById("actionAddInput");
        const actionStatusInput = document.getElementById("actionStatusInput");

        if (
            actionDateInput &&
            actionCNumberInput &&
            actionIssuerInput &&
            actionDocInput &&
            actionSegInput &&
            actionGuaranteeInput &&
            actionProdInput &&
            actionAmountInput &&
            actionAddInput &&
            actionStatusInput
        ){
            const jsonContract = JSON.stringify({
                date: actionDateInput.value,
                contractNumber: actionCNumberInput.value,
                issuer: actionIssuerInput.value,
                doc: actionDocInput.value,
                segment: actionSegInput.value,
                guarantee: actionGuaranteeInput.value,
                product: actionProdInput.value,
                amount: actionAmountInput.value,
                additional: actionAddInput.value,
                status: actionStatusInput.value
            });

            localStorage.setItem(contractId, jsonContract);
            updateTableRow(contractId);
            closeModal('actionTypeModal', 'actionModalContent');
        }
    }

    function remove(contractId) {
        localStorage.removeItem(contractId);
        const row = document.querySelector(`[data-id="${contractId}"]`);
        if (row) { row.remove(); }
        closeModal('actionTypeModal', 'actionModalContent');
    }

    // OBSERVADORES DE EVENTOS
    document.getElementById("creationTypeForm").addEventListener("submit", (e) => {
        e.preventDefault();
        save();
    })

    window.addEventListener("load", (e) => {
        e.preventDefault();
        if (sheetIdSpanElement) sheetIdSpanElement.innerText = sheetId
        refreshTable();
    })

    /**
     * INTEGRAÇÃO
     * LINHAS NA TABELA
     * FORMATAÇÃO DINHEIRO
     * PAGINAÇÃO
     * VALIDAÇÃO DE FORMULÁRIO
     * INFORMAÇÕES DA PLANILHA
     * SINCRONIZAR COM GOOGLE
     * LOADING
     * AVISOS (DIALOGS)
     * PREVENT DEFAULT
     * COMENTÁRIOS
     * TRY CATCH
     * NOMES
     */
