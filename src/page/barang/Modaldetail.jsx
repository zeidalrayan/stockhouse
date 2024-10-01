import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Modaldetail({ isOpen, onClose, barang, suplier }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {barang.nama_barang || "Item Details"}
        </ModalHeader>
        <ModalBody>
          {barang.foto_barang && (
            <img
              src={barang.foto_barang}
              alt={`${barang.nama_barang} photo`}
              className="h-40 w-full object-contain mt-2 mb-4"
            />
          )}
          <p>Harga: {barang.harga}</p>
          <p>Stok: {barang.stok}</p>
          <p>Deskripsi: {barang.deskripsi}</p>
          {suplier && (
            <>
              <hr className="my-4" />
              <h3 className="text-xl font-semibold">Suplier Information</h3>
              {suplier.logo_supplier && (
                <img
                  src={suplier.logo_supplier}
                  alt={`${suplier.nama_supplier} logo`}
                  className="h-20 w-full object-contain mt-2 mb-4"
                />
              )}
              <p>Nama Suplier: {suplier.nama_supplier}</p>
              <p>Alamat: {suplier.alamat}</p>
              <p>Email: {suplier.email}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
